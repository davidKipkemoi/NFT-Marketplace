const express = require('express');
const router = express.Router();
const { ethers } = require('ethers'); // Import ethers for signature verification

// Removed bcrypt import - Supabase handles password hashing
// const bcrypt = require('bcrypt');
// Removed unused jwt import
// const jwt = require('jsonwebtoken');

// Import JWT_SECRET and supabase client from index.js
// const { supabase } = require('../../index'); // Removed old import
const { supabase, supabaseAdmin } = require('../supabaseClient'); // Import both clients
const authenticateToken = require('../middleware/authMiddleware'); // Import authentication middleware

// Removed dummy user storage - using Supabase database instead
// const users = []; // In-memory array for temporary user storage

// User Registration (Signup) Route
router.post('/register', async (req, res) => {
  const { email, password } = req.body; // Use email instead of username for Supabase auth

  // Basic input validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Use Supabase auth.signUp to create a new user
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Error registering user with Supabase:', error.message);
      // Handle specific Supabase auth errors (e.g., user already exists)
      if (error.message.includes('already exists')) {
        return res.status(409).json({ message: 'User with this email already exists' });
      }
      return res.status(500).json({ message: 'Error registering user', error: error.message });
    }

    // User registered successfully in Supabase auth
    // You might want to send a confirmation email or log them in automatically here
    
    // Create a profile entry for the new user in the 'profiles' table
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: data.user.id }]); // Link profile to auth.users with the user's ID

    if (profileError) {
      console.error('Error creating user profile:', profileError.message);
      // Depending on how critical profile creation is, you might want to delete the user here
      // await supabase.auth.admin.deleteUser(data.user.id);
      return res.status(500).json({ message: 'Error creating user profile', error: profileError.message });
    }

    res.status(201).json({ message: 'User registered successfully', user: data.user, profile: profileData });

  } catch (error) {
    console.error('Unexpected error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Get email and password from request body

  // Basic input validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Use Supabase auth.signInWithPassword to log in the user
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Error logging in user with Supabase:', error.message);
      // Handle Supabase auth errors (e.g., invalid credentials)
      return res.status(401).json({ message: 'Invalid credentials', error: error.message });
    }

    // User logged in successfully
    // The session object contains the access token (JWT)
    const token = data.session.access_token; // Get the JWT from the session

    // Respond with the JWT
    res.status(200).json({ token });

  } catch (error) {
    console.error('Unexpected error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Protected route - requires a valid JWT (we might adjust this to use Supabase session later)
router.get('/profile', authenticateToken, async (req, res) => {
  // If we reach this point, the token was verified by authenticateToken middleware,
  // and user information is available in req.user

  try {
    // Fetch the user's profile from the 'profiles' table using the user ID from the token
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*') // Select all columns from the profile
      .eq('id', req.user.id) // Filter by the user's ID
      .single(); // Expecting a single profile for a given user ID

    if (error) {
      console.error('Error fetching user profile:', error.message);
      return res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }

    if (!profile) {
      // This case should ideally not happen if a profile is created on signup,
      // but it's good to handle it.
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Respond with the user's profile data
    res.status(200).json({ user: req.user, profile });

  } catch (error) {
    console.error('Unexpected error during profile fetch:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add route to update user profile
router.patch('/profile', authenticateToken, async (req, res) => {
  // If we reach this point, the token was verified by authenticateToken middleware,
  // and user information is available in req.user
  const updates = req.body; // Get updates from the request body

  try {
    // Update the user's profile in the 'profiles' table
    const { data, error } = await supabase
      .from('profiles')
      .update(updates) // Apply the updates from the request body
      .eq('id', req.user.id) // Filter by the user's ID
      .select(); // Select the updated row to return

    if (error) {
      console.error('Error updating user profile:', error.message);
      return res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }

    if (!data || data.length === 0) {
       // This might happen if the profile was not found (though unlikely with the current flow)
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Respond with the updated profile data
    res.status(200).json({ message: 'Profile updated successfully', profile: data[0] });

  } catch (error) {
    console.error('Unexpected error during profile update:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add route to logout user
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // Use Supabase auth.signOut to invalidate the user's session
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error logging out user with Supabase:', error.message);
      return res.status(500).json({ message: 'Error logging out', error: error.message });
    }

    res.status(200).json({ message: 'Logged out successfully' });

  } catch (error) {
    console.error('Unexpected error during logout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Wallet Authentication - Challenge Route
router.post('/wallet/challenge', async (req, res) => {
  const { walletAddress } = req.body;

  // Basic validation for wallet address
  if (!walletAddress) {
    return res.status(400).json({ message: 'Wallet address is required' });
  }

  // TODO: Add more robust wallet address format validation

  try {
    // Generate a unique challenge message and set an expiration time (e.g., 5 minutes)
    const challenge = `Please sign this message to authenticate with MetaCanvas:\n${Date.now()}`;
    const challengeExpiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 minutes from now

    // Find the profile associated with this wallet address or create a new one
    // Note: This assumes wallet_address is unique or handles multiple users per wallet address appropriately
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('id')
      .eq('wallet_address', walletAddress)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows found
      console.error('Error fetching profile by wallet address:', fetchError.message);
      return res.status(500).json({ message: 'Error fetching profile', error: fetchError.message });
    }

    let profileId;

    if (existingProfile) {
      // Update existing profile with new challenge
      profileId = existingProfile.id;
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ challenge: challenge, challenge_expires_at: challengeExpiresAt })
        .eq('id', profileId);

      if (updateError) {
        console.error('Error updating profile with challenge:', updateError.message);
        return res.status(500).json({ message: 'Error updating profile with challenge', error: updateError.message });
      }

    } else {
      // Create a new temporary profile entry for this wallet address
      // We use a temporary ID here, it will be linked to auth.users later during verification if it's a new user
      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .insert([{ wallet_address: walletAddress, challenge: challenge, challenge_expires_at: challengeExpiresAt }])
        .select('id');

      if (insertError) {
        console.error('Error creating temporary profile for challenge:', insertError.message);
        return res.status(500).json({ message: 'Error creating temporary profile', error: insertError.message });
      }
      profileId = newProfile[0].id;
    }

    // Respond with the challenge message
    res.status(200).json({ challenge });

  } catch (error) {
    console.error('Unexpected error during challenge generation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Wallet Authentication - Verify Signature Route
router.post('/wallet/verify', async (req, res) => {
  const { walletAddress, signature } = req.body;

  if (!walletAddress || !signature) {
    return res.status(400).json({ message: 'Wallet address and signature are required' });
  }

  try {
    // 1. Fetch the profile and the stored challenge
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('id, challenge, challenge_expires_at')
      .eq('wallet_address', walletAddress)
      .single();

    if (fetchError) {
        if (fetchError.code === 'PGRST116') { // No rows found
            return res.status(404).json({ message: 'Profile not found for this wallet address. Request a challenge first.' });
        }
      console.error('Error fetching profile for verification:', fetchError.message);
      return res.status(500).json({ message: 'Error fetching profile', error: fetchError.message });
    }

    const { id: profileId, challenge, challenge_expires_at: challengeExpiresAt } = profile;

    // 2. Check if challenge exists and is not expired
    if (!challenge || !challengeExpiresAt || new Date() > new Date(challengeExpiresAt)) {
      // Clear expired/used challenge
      await supabase
        .from('profiles')
        .update({ challenge: null, challenge_expires_at: null })
        .eq('id', profileId);
        
      return res.status(400).json({ message: 'Invalid or expired challenge. Please request a new challenge.' });
    }

    // 3. Verify the signature
    let recoveredAddress;
    try {
        recoveredAddress = ethers.verifyMessage(challenge, signature);
    } catch (sigError) {
        console.error('Signature verification failed:', sigError);
         // Clear challenge on verification failure
        await supabase
            .from('profiles')
            .update({ challenge: null, challenge_expires_at: null })
            .eq('id', profileId);

        return res.status(401).json({ message: 'Signature verification failed.' });
    }

    // 4. Compare recovered address with the provided wallet address (case-insensitive)
    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
         // Clear challenge on address mismatch
        await supabase
            .from('profiles')
            .update({ challenge: null, challenge_expires_at: null })
            .eq('id', profileId);

        return res.status(401).json({ message: 'Signature does not match wallet address.' });
    }

    // 5. Signature is valid. Authenticate the user.
    
    // Check if this profile is already linked to a Supabase auth user
    const { data: authUser, error: fetchAuthUserError } = await supabaseAdmin.auth.admin.getUserById(profileId);

    let userIdToAuthenticate;

    if (fetchAuthUserError && fetchAuthUserError.status !== 404) { // 404 means user not found, which is expected for new wallet users
        console.error('Error fetching auth user by profile ID:', fetchAuthUserError.message);
        return res.status(500).json({ message: 'Error fetching auth user', error: fetchAuthUserError.message });
    }

    if (authUser && authUser.user) {
        // User already exists in auth.users and is linked to this profile
        userIdToAuthenticate = authUser.user.id;
    } else {
        // New wallet user - create a new user in Supabase auth
        // Note: We don't have email/password here, Supabase auth.users will just have an ID
        // and will be linked via the 'profiles' table using the same ID.
        // The user's primary identifier will be their wallet_address.

        // Generate a temporary email and password for Supabase's internal requirement
        // This won't be used for login, but is needed for createSession
        const tempEmail = `wallet_${walletAddress.toLowerCase()}@metacanvas.xyz`; // Using wallet address to ensure uniqueness
        // We need to create the user first if they don't exist. Admin client can't create users directly with just an ID.
        // The typical flow for wallet auth without email/password in Supabase involves custom solutions
        // or linking an existing auth user to a wallet. 
        // For simplicity here, we'll assume the profile ID can be directly used as the user ID
        // if a user doesn't exist in auth.users. This might require specific Supabase setup
        // or is a simplification for this example. 
        // A more robust solution might involve a dedicated 'wallet_users' table or linking to an existing email user.
        // Let's proceed with the simplification for now and use the profileId as the userId.
        userIdToAuthenticate = profileId;
         // We also need to ensure the user exists in auth.users. Supabase admin client doesn't directly create a user by ID.
         // A common pattern is to use 'auth.admin.inviteUserByEmail' with a dummy email and then update, or use a custom function.
         // Given the limitations and the previous structure, linking a user to a profile is key.
         // Let's check if a user with this wallet address *already* has a profile. We did this earlier.
         // If existingProfile was found, we authenticate that user.
         // If not, we created a new profile. We need to create a user in auth.users for this *new* profile.

         // Okay, rethinking: The easiest way with Supabase Auth and Admin Client is to create the user first.
         // Let's update the logic: Check if a user exists by walletAddress -> If yes, use that user. If no, create user, then create profile linked to user.
         // This conflicts slightly with the challenge endpoint creating a temporary profile first.

         // Let's revert to the simpler logic based on the existing profile entry:
         // If profile exists with wallet_address: Assume it's the user's profile. 
         // If auth.users has a user with the SAME ID as this profile: Authenticate that user.
         // If auth.users *doesn't* have a user with the SAME ID as this profile: This should only happen if the profile was just created by the challenge endpoint for a brand new wallet. We need to create a user in auth.users with this profileId as the user ID.

        if (!authUser || !authUser.user) { // User does NOT exist in auth.users with this profile ID
            // Create the user in auth.users using the admin client.
            // This requires an email, even if it's a dummy one.
            const { data: createdUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
                 email: `wallet_${walletAddress.toLowerCase()}_${Date.now()}@metacanvas.temp`,
                 // password: 'temp_password_not_used',
                 email_confirm: true, // Auto-confirm the dummy email
            });
            if (createUserError) {
                console.error('Error creating auth user for new wallet:', createUserError.message);
                return res.status(500).json({ message: 'Error creating user account', error: createUserError.message });
            }
            userIdToAuthenticate = createdUser.user.id;

            // Now link the newly created auth user ID to the existing profile entry
             const { error: linkProfileError } = await supabase
                .from('profiles')
                .update({ id: userIdToAuthenticate })
                .eq('id', profileId); // Update the temporary profile ID to the new auth user ID
            
            if (linkProfileError) {
                console.error('Error linking new auth user to profile:', linkProfileError.message);
                // Consider deleting the newly created user and profile here if linking fails
                 return res.status(500).json({ message: 'Error linking profile to user', error: linkProfileError.message });
            }
             profileId = userIdToAuthenticate; // Update profileId to the new user ID for session creation
        }
    }

    // Create a Supabase session for the authenticated user
    const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.admin.createSession(userIdToAuthenticate);

    if (sessionError) {
        console.error('Error creating Supabase session:', sessionError.message);
        return res.status(500).json({ message: 'Error creating session', error: sessionError.message });
    }

    // 6. Clear the used challenge from the profile
    await supabase
      .from('profiles')
      .update({ challenge: null, challenge_expires_at: null })
      .eq('id', profileId);

    // 7. Respond with the session tokens
    res.status(200).json({ 
        accessToken: sessionData.session.access_token, 
        refreshToken: sessionData.session.refresh_token 
    });

  } catch (error) {
    console.error('Unexpected error during signature verification:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// TODO: Consider other authentication related tasks if needed

module.exports = router; 