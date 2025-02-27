'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Container, Text, Title } from '@mantine/core';
import classes from './Hero.module.css';

const slides = [
  {
    image: '/5p.jpg', 
    title: 'Welcome to Employee Hierarchy Management',
    subtitle: 'Empower your organization with structured leadership and clear reporting lines.',
  },
  {
    image: '/2p.jpg',
    title: 'Define Roles & Responsibilities',
    subtitle: 'Assign clear positions and responsibilities from interns to executives.',
  },
  {
    image: '/3p.jpg',
    title: 'Enhance Team Collaboration',
    subtitle: 'Foster seamless communication for effective project management and teamwork.',
  },
  {
    image: '/4p.jpg',
    title: 'Visualize Organizational Structure',
    subtitle: 'Create a hierarchical view of employee positions with parent-child relationships.',
  },
  {
    image: '/1p.jpg',
    title: 'Manage Employee Positions',
    subtitle: 'Easily add, update, or delete positions within the hierarchy with a user-friendly interface.',
  },
];


 function HeroImageRight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.root} style={{ backgroundImage: `url(${slides[activeIndex].image})` }}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              {slides[activeIndex].title}
            </Title>

            <Text className={classes.description} mt={20}>
              {slides[activeIndex].subtitle}
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: 'green', to: 'teal' }}
              size="xl"
              className={classes.control}
              mt={30}
              onClick={() => router.push('/login')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default HeroImageRight