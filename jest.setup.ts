import '@testing-library/jest-dom';
import { loadEnvConfig } from '@next/env';


// Load .env (optional but nice)
loadEnvConfig(process.cwd());

// Mock next/navigation (for usePathname, redirect, etc.)
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
  useParams: () => ({}),
  redirect: jest.fn(),
  notFound: jest.fn(),
}));