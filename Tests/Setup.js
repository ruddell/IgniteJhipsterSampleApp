// Mock your external modules here if needed
jest
.mock('react-native-router-flux', () => {
  return { Actions: { login: jest.fn(() => { return false }) } }
})

console.tron = { log: () => {}, display: () => {} }
