import {
  Authenticated,
  AuthLoading,
  Unauthenticated,
} from "convex/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Activity } from "./app/Activity";
import { AppLayout } from "./app/AppLayout";
import { AssessmentGenerator } from "./app/AssessmentGenerator";
import { Agents } from "./app/Agents";
import { Ask } from "./app/Ask";
import { Companies } from "./app/Companies";
import { CompanyDetail } from "./app/CompanyDetail";
import { ContactDetail } from "./app/ContactDetail";
import { Contacts } from "./app/Contacts";
import { Outreach } from "./app/Outreach";
import { OutreachMetrics } from "./app/OutreachMetrics";
import { Dashboard } from "./app/Dashboard";
import { Deals } from "./app/Deals";
import { Settings } from "./app/Settings";
import { SignInPage } from "./auth/SignInPage";
import { Compare } from "./pages/Compare";
import { Docs } from "./pages/Docs";

export default function App() {
  return (
    <>
      <AuthLoading>
        <div className="flex min-h-screen items-center justify-center bg-ink text-sm text-neutral-500">
          Checking session…
        </div>
      </AuthLoading>
      <Unauthenticated>
        <SignInPage />
      </Unauthenticated>
      <Authenticated>
        <Routes>
          <Route path="/" element={<Navigate to="/app" replace />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="companies" element={<Companies />} />
            <Route path="companies/:companyId" element={<CompanyDetail />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="outreach" element={<Outreach />} />
            <Route path="outreach-metrics" element={<OutreachMetrics />} />
            <Route path="contacts/:contactId" element={<ContactDetail />} />
            <Route path="deals" element={<Deals />} />
            <Route path="ask" element={<Ask />} />
            <Route path="assessment-generator" element={<AssessmentGenerator />} />
            <Route path="activity" element={<Activity />} />
            <Route path="agents" element={<Agents />} />
            <Route path="settings/:section?" element={<Settings />} />
          </Route>
        </Routes>
      </Authenticated>
    </>
  );
}
