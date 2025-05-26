import React from 'react';
import { motion } from 'framer-motion';
import { features } from '../../data/staticData';
import { scaleIn } from '../../data/animationVariants';
import Section from '../ui/Section';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import Icon from '../ui/Icon';

const FeaturesSection = () => {
  return (
    <Section bgClassName="bg-gradient-to-b from-slate-900 to-zinc-900">
      <SectionTitle 
        title="Premium Digital Marketplace" 
        subtitle="Carefully curated artwork from established and emerging digital artists" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <Card key={index} variants={scaleIn}>
            <Icon path={feature.icon} />
            <h3 className="text-xl font-semibold mb-3 text-center">
              {feature.title}
            </h3>
            <p className="text-slate-400 text-center leading-relaxed">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default FeaturesSection; 