import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube, IconMail, IconPhone, IconMapPin } from '@tabler/icons-react';
import {
  ActionIcon,
  Button,
  Group,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import classes from './Contact.module.css';

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

export function ContactUs() {
  const icons = social.map((Icon, index) => (
    <ActionIcon key={index} size={28} className={classes.social} variant="transparent">
      <Icon size={22} stroke={1.5} />
    </ActionIcon>
  ));

  return (
    <div className={classes.outer}>
    <div className={classes.wrapper}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
        {/* Left Side - Contact Info */}
        <div>
          <Title className={classes.title}>Contact Us</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            Leave your email, and we will get back to you within 24 hours.
          </Text>

          {/* Contact Information */}
          <Group align="center" mt="md">
            <IconMapPin size={24} stroke={1.5} />
            <Text>Addis Ababa, Ethiopia, Haile Gebre Silase St.<br /> Noah City Point Building, 4th Floor</Text>
          </Group>

          <Group align="center" mt="md">
            <IconPhone size={24} stroke={1.5} />
            <Text>+251 (114) 701998</Text>
          </Group>

          <Group align="center" mt="md">
            <IconMail size={24} stroke={1.5} />
            <Text>Info@peragosystems.com</Text>
          </Group>

          {/* Social Icons */}
          <Group mt="xl">{icons}</Group>
        </div>

        {/* Right Side - Contact Form */}
        <div className={classes.form}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <TextInput
            label="Name"
            placeholder="John Doe"
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <Textarea
            required
            label="Your message"
            placeholder="I want to learn more about your services"
            minRows={4}
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />

          <Group justify="flex-end" mt="md">
            <Button className={classes.control}>Send Message</Button>
          </Group>
        </div>
      </SimpleGrid>
    </div>
    </div>
  );
}
