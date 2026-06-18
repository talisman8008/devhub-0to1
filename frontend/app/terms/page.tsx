import type { Metadata } from 'next'
import { LegalSection, LegalShell } from '@/components/legal-shell'

export const metadata: Metadata = {
  title: '0to1 — Terms of Service',
  description: 'The terms governing participation in 0to1, a startup-building internship by DevHub India LLP.'
}

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" lastUpdated="June 2026">
      <p>
        These Terms govern participation in 0to1, a startup-building internship operated by DevHub India LLP.
      </p>

      <LegalSection heading="1. Acceptance">
        <p>By applying to, paying for, or participating in 0to1, you agree to these Terms.</p>
      </LegalSection>

      <LegalSection heading="2. Admissions">
        <p>Submission of an application does not guarantee admission.</p>
        <p>
          DevHub India LLP reserves the right to accept, reject, defer, or revoke participation at its
          discretion.
        </p>
      </LegalSection>

      <LegalSection heading="3. Program Nature">
        <p>0to1 is an educational and experiential startup-building program.</p>
        <p>Participation does not guarantee:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Startup success</li>
          <li>Funding</li>
          <li>Investment</li>
          <li>Employment</li>
          <li>Internships</li>
          <li>Partnerships</li>
          <li>Business outcomes</li>
        </ul>
        <p>Results depend entirely on participant effort, team execution, and external market conditions.</p>
      </LegalSection>

      <LegalSection heading="4. Participant Responsibilities">
        <p>Participants are expected to:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Engage respectfully</li>
          <li>Attend sessions when possible</li>
          <li>Contribute to team activities</li>
          <li>Maintain professional conduct</li>
          <li>Follow community guidelines</li>
        </ul>
      </LegalSection>

      <LegalSection heading="5. Community Conduct">
        <p>DevHub reserves the right to suspend or remove participants for:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Harassment</li>
          <li>Abuse</li>
          <li>Hate speech</li>
          <li>Fraudulent activity</li>
          <li>Disruptive behaviour</li>
          <li>Repeated violations of community standards</li>
        </ul>
        <p>Removal decisions are final.</p>
      </LegalSection>

      <LegalSection heading="6. Intellectual Property">
        <p>
          Participants retain ownership of the products, ideas, startups, projects, and intellectual property
          they create during the program.
        </p>
        <p>
          By participating, you grant DevHub a non-exclusive right to reference, showcase, and discuss such work
          for educational, community, and promotional purposes.
        </p>
      </LegalSection>

      <LegalSection heading="7. Recordings & Media">
        <p>Participants consent to the recording of sessions, events, and activities.</p>
        <p>
          DevHub may use participant names, photographs, testimonials, and recordings for operational and
          promotional purposes.
        </p>
      </LegalSection>

      <LegalSection heading="8. Payments">
        <p>Program fees are payable according to the selected payment plan.</p>
        <p>All payments made to 0to1 are final.</p>
        <p>
          Except where required by law, fees are non-refundable once payment has been successfully processed.
        </p>
      </LegalSection>

      <LegalSection heading="9. Changes">
        <p>
          DevHub may modify schedules, mentors, sessions, speakers, or program structure when necessary to
          improve participant experience.
        </p>
      </LegalSection>

      <LegalSection heading="10. Limitation of Liability">
        <p>
          DevHub India LLP shall not be liable for indirect, incidental, consequential, academic, financial,
          startup-related, or business-related losses arising from participation in the program.
        </p>
      </LegalSection>

      <LegalSection heading="11. Contact">
        <p>Questions regarding these Terms may be directed to:</p>
        <p>
          Email: <a className="text-accent hover:underline" href="mailto:jrdhokle@gmail.com">jrdhokle@gmail.com</a>
          <br />
          Phone: +91 96376 21812
        </p>
      </LegalSection>
    </LegalShell>
  )
}
