interface TokenProvider {
  getAccessToken: () => Promise<string | null>;
  clearSession: () => Promise<void>;
}

export let tokenProvider: TokenProvider | null = null;

export const setTokenProvider = (provider: TokenProvider): void => {
  tokenProvider = provider;
};
