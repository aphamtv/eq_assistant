import { Layout, Text, Page } from '@vercel/examples-ui'
import { Chat } from '../components/Chat'
import Link from 'next/link';
import React from 'react';


function Home() {
  return (
    <Page className="flex flex-col gap-12">
      <section className="flex flex-col gap-6">
        <Text variant="h1">Emotion Guide</Text>
        <Text className="text-zinc-600">
        {"Welcome to Emotion Guide! I'm dedicated to helping you understand the emotions and emotional triggers within written messages. Whether you're looking to gain a deeper understanding of others, build stronger relationships, or make your conversations more meaningful, I'm here to provide valuable insights. Just paste or type in the text, and together we'll uncover the underlying sentiments that can transform your communication experience. Let's embark on a journey to connect on a deeper emotional level!"}
        </Text>
      </section>

      <section className="flex flex-col gap-6">
        <Text variant="h2"></Text>
        <div className="flex flex-col gap-6">
          <Chat />
        </div>
      </section>

      {/* <Link href="/disclaimer">Disclaimer</Link> */}
      <p>Please make sure to read our 
        <Link legacyBehavior href="/disclaimer">
          <a className="underline" target="_blank" rel="noopener noreferrer"> Disclaimer</a>
        </Link> before using the Emotion Guide.
      </p>
     
    </Page>
  )
}

Home.Layout = Layout

export default Home


