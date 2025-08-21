// Session timeout functionality disabled - users stay logged in until manual logout
export const useSessionTimeout = () => {
  return {
    timeLeft: '',
    showWarning: false,
    resetTimer: () => {}
  };
};