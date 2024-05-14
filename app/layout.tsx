import '@mantine/core/styles.css';
import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { MantineMainComponent } from './components/MantineMainComponent';

export const metadata: Metadata = {
  title: 'DoD Projects',
  description: 'List of Department of Defense public projects.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <MantineProvider defaultColorScheme='dark'>
          <MantineMainComponent>
            {children}
          </MantineMainComponent>
        </MantineProvider>
      </body>
    </html>
  );
}
