import type { Metadata } from 'next'
import { LegalSection, LegalShell } from '@/components/legal-shell'

export const metadata: Metadata = {
  title: '0to1 — Privacy Policy',
  description: 'How DevHub India LLP collects, uses, and protects your information in the 0to1 program.'
}

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" lastUpdated="June 2026">
      <p>
        0to1 is operated by DevHub India LLP (&ldquo;DevHub&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or
        &ldquo;us&rdquo;). This Privacy Policy explains how we collect, use, and protect your information when
        you apply to or participate in the 0to1 program.
      </p>

      <LegalSection heading="1. Information We Collect">
        <p>When you apply or interact with 0to1, we may collect:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>College and academic information</li>
          <li>Portfolio links and social profiles</li>
          <li>Application responses</li>
          <li>Payment information</li>
          <li>Communications with our team</li>
        </ul>
      </LegalSection>

      <LegalSection heading="2. How We Use Your Information">
        <p>We use your information to:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Process applications</li>
          <li>Evaluate eligibility</li>
          <li>Communicate updates regarding the cohort</li>
          <li>Manage mentorship and community activities</li>
          <li>Improve the program experience</li>
          <li>Send important announcements and resources</li>
          <li>Maintain internal records</li>
        </ul>
      </LegalSection>

      <LegalSection heading="3. Session Recordings & Media">
        <p>Certain sessions, workshops, mentor interactions, and events may be recorded.</p>
        <p>
          By participating in 0to1, you consent to the use of photographs, recordings, testimonials, and other
          media for educational, operational, and promotional purposes.
        </p>
      </LegalSection>

      <LegalSection heading="4. Information Sharing">
        <p>We do not sell your personal information.</p>
        <p>Information may be shared only with:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Program mentors</li>
          <li>Operational team members</li>
          <li>Service providers required to operate the program</li>
          <li>Legal authorities when required by law</li>
        </ul>
      </LegalSection>

      <LegalSection heading="5. Data Security">
        <p>
          We take reasonable measures to protect participant information. However, no online platform can
          guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection heading="6. Minors">
        <p>Participants under the age of 18 may join only with parental or guardian consent.</p>
      </LegalSection>

      <LegalSection heading="7. Contact">
        <p>For privacy-related questions:</p>
        <p>
          DevHub India LLP
          <br />
          Email: <a className="text-accent hover:underline" href="mailto:jrdhokle@gmail.com">jrdhokle@gmail.com</a>
          <br />
          Phone: +91 96376 21812
          <br />
          Address: DevHub Office
        </p>
      </LegalSection>

      <LegalSection heading="8. Updates">
        <p>
          We may update this Privacy Policy from time to time. Continued participation constitutes acceptance of
          any revised policy.
        </p>
      </LegalSection>
    </LegalShell>
  )
}
