'use client';

import React, { useState, useEffect } from 'react';
import AnimatedDiv from '@/components/AnimatedDiv';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Item {
  icon: string;
  title: string;
  subtitle: string;
}

interface AboutUsData {
  title: string;
  subtitle?: string;
  description: string;
  items: Item[];
}

export default function AboutUs() {
  const [data, setData] = useState<AboutUsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/about-us');
        if (response.ok) {
          const aboutUsData = await response.json();
          setData(aboutUsData);
        }
      } catch (error) {
        console.error('Error fetching about us data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutUs();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="h-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-8" />
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!data || !data.items || data.items.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedDiv animation="slideUp" duration={0.6}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-secondary-50">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
              {data.subtitle}
            </p>
          )}
        </AnimatedDiv>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {data.items.map((item, index) => (
            <AnimatedDiv
              key={index}
              animation="slideUp"
              duration={0.6}
              delay={index * 0.1}
            >
              <Card className="w-full md:w-80 hover:shadow-lg transition-shadow border-blue-100/60 dark:border-blue-900/40 bg-[#293466] dark:bg-[#1a2540] border-0">
                <CardHeader className="flex flex-col gap-4">
                  <span className="text-4xl" aria-hidden>
                    {item.icon}
                  </span>
                  <CardTitle className="text-xl text-secondary-50 dark:text-secondary-50">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-100 dark:text-gray-200">
                    {item.subtitle}
                  </p>
                </CardContent>
              </Card>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
