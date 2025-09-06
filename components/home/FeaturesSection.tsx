import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Award, Clock, Shield, CreditCard } from 'lucide-react';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default async function FeaturesSection(): Promise<React.ReactElement> {
  const t = await getTranslations('Features');
  
  const features: FeatureItem[] = [
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: t('premiumQuality'),
      description: t('premiumQualityDescription'),
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: t('fastDelivery'),
      description: t('fastDeliveryDescription'),
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: t('securePayment'),
      description: t('securePaymentDescription'),
    },
    {
      icon: <CreditCard className="w-6 h-6 text-primary" />,
      title: t('easyReturns'),
      description: t('easyReturnsDescription'),
    }
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-center text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
