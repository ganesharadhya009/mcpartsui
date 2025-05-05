import TestConstant from "../modules/global/constants/testConstants";
import loginReducer, {
  login,
  logout,
} from "../modules/global/redux/login/loginSlice";

/**
 * Test cases for the login reducer and slice.
 * This suite tests the login and logout functionality,
 * verifying that the reducer responds correctly to actions.
 */
describe(TestConstant.LOGIN_SLICE_DESCRIPTION, () => {
  // Initial state for the login reducer
  const initialState = {
    isLoggedIn: false,
    token: null,
    userData: null,
  };

  /**
   * Test case for the initial state of the reducer.
   * It checks if the reducer returns the initial state
   * when an unknown action is dispatched.
   */
  it(TestConstant.LOGIN_SLICE_CASE_1, () => {
    expect(loginReducer(undefined, { type: "" })).toEqual(initialState);
  });

  /**
   * Test case for successful login action.
   * It checks if the reducer updates the state correctly
   * when a login action is dispatched with user data.
   */
  it(TestConstant.LOGIN_SLICE_CASE_2, () => {
    const user = {
      token: TestConstant.SAMPLE_TOKEN,
      isLoggedIn: true,
      userData: {
        id: 4,
        email: "rajeev@gmail.com",
        firstName: "Rajeev",
        lastName: "Ranjan",
        fullName: "Rajeev Ranjan",
        phoneNumber: "318337560",
        department: null,
        degree: null,
        gender: null,
        photo: null,
        isFirstTimeLogin: false,
        roles: [{ roleName: "HospitalAdmin", permissions: ["hello"] }],
      },
    };
    const action = login(user);
    const expectedState = {
      token: user.token,
      isLoggedIn: true,
      userData: null,
    };
    expect(loginReducer(initialState, action)).toEqual(expectedState);
  });

  /**
   * Test case for successful logout action.
   * It checks if the reducer resets the state back to
   * initial state when a logout action is dispatched.
   */
  it(TestConstant.LOGIN_SLICE_CASE_3, () => {
    const user = {
      token: TestConstant.SAMPLE_TOKEN,
      isLoggedIn: true,
      userData: {
        id: 4,
        email: "rajeev@gmail.com",
        firstName: "Rajeev",
        lastName: "Ranjan",
        fullName: "Rajeev Ranjan",
        phoneNumber: "318337560",
        department: null,
        degree: null,
        gender: null,
        photo: null,
        isFirstTimeLogin: false,
        roles: [{ roleName: "HospitalAdmin", permissions: ["hello"] }],
      },
    };
    const authenticatedState = {
      isLoggedIn: true,
      token: user.token,
      userData: {
        id: 4,
        email: "rajeev@gmail.com",
        firstName: "Rajeev",
        lastName: "Ranjan",
        fullName: "Rajeev Ranjan",
        phoneNumber: "318337560",
        department: null,
        degree: null,
        gender: null,
        photo: null,
        isFirstTimeLogin: false,
        roles: [{ roleName: "HospitalAdmin", permissions: ["hello"] }],
      },
    };
    const action = logout();
    expect(loginReducer(authenticatedState, action)).toEqual(initialState);
  });
});
