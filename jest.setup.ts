/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => key,
    };
  },
  Trans: ({ children }: any) => `<div>{children}</div>`,
}));
