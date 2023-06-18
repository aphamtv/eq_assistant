import React from 'react';
import { Layout, Text, Page } from '@vercel/examples-ui';
import { Chat } from '../components/Chat';
import Link from 'next/link';

function DisclaimerPage () {
  return (
      <Page className="flex flex-col gap-12">
        <section className="flex flex-col gap-3">
          <Text variant="h2">Disclaimer</Text>
          <Text>
            The Emotion Guide Assistant is an AI-powered tool that utilizes the GPT technology to provide responses to user questions. By using this tool, you acknowledge and agree to the following terms:
          </Text>
          <ol className="list-disc pl-6 list-inside">
            <li> Age Restriction: The Emotion Guide is intended for use by individuals aged 13 years or older. If you are under the age of 13, please refrain from using this tool.</li><br/>
            <li>Accuracy of Information: While the Emotion Guide strives to provide accurate and helpful information, it is important to note that the responses generated by the AI may not always be entirely accurate or up to date. The tool should be used as a suggestion or starting point for further research, and any information obtained from it should be verified independently.</li><br/>
            <li>Limited Responsibility: The Emotion Guide is an automated system that relies on a vast amount of data and general knowledge. It does not have the ability to comprehend or verify the accuracy of the information it generates. Therefore, the creators and developers of the Emotion Guide cannot be held responsible for any consequences resulting from the use or interpretation of the information provided by the tool.</li> <br/>
            <li>Independent Judgment: Users of the Emotion Guide are advised to exercise their own judgment and discretion when relying on the information provided. It is always recommended to consult multiple sources and seek professional advice when making decisions or taking actions based on the information obtained from the Emotion Guide.</li><br/>
            <li>Data Privacy: The creators of the Emotion Guide are committed to protecting user privacy. We want to emphasize that we do not store any personal user data. While the tool does not intentionally collect or retain any information about users, including personally identifiable information, it operates in real-time and may temporarily store data necessary for the functioning of the tool during a user session. However, no data is stored or retained beyond the immediate session. We take appropriate measures to ensure the safeguarding of user information, but it's important to note that no system is completely immune to potential security risks. We do not share, sell, or distribute any user data to third parties.</li><br/>
          </ol>
          <Text>
            By using the Emotion Guide, you acknowledge that you have read, understood, and agreed to the terms outlined in this disclaimer.
          </Text>
        </section>

      </Page>
  )
}
DisclaimerPage.Layout = Layout

export default DisclaimerPage

 