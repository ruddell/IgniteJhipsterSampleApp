export default {
  // Functions return fixtures

  // entity fixtures

  updateRegion: (region) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateRegion.json')
    }
  },
  getRegions: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getRegions.json')
    }
  },
  getRegion: (regionId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getRegion.json')
    }
  },
  deleteRegion: (regionId) => {
    return {
      ok: true
    }
  },

  updateCountry: (country) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateCountry.json')
    }
  },
  getCountries: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getCountries.json')
    }
  },
  getCountry: (countryId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getCountry.json')
    }
  },
  deleteCountry: (countryId) => {
    return {
      ok: true
    }
  },

  updateLocation: (location) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateLocation.json')
    }
  },
  getLocations: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getLocations.json')
    }
  },
  getLocation: (locationId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getLocation.json')
    }
  },
  deleteLocation: (locationId) => {
    return {
      ok: true
    }
  },

  updateDepartment: (department) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateDepartment.json')
    }
  },
  getDepartments: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getDepartments.json')
    }
  },
  getDepartment: (departmentId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getDepartment.json')
    }
  },
  deleteDepartment: (departmentId) => {
    return {
      ok: true
    }
  },

  updateTask: (task) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateTask.json')
    }
  },
  getTasks: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getTasks.json')
    }
  },
  getTask: (taskId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getTask.json')
    }
  },
  deleteTask: (taskId) => {
    return {
      ok: true
    }
  },

  updateEmployee: (employee) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateEmployee.json')
    }
  },
  getEmployees: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getEmployees.json')
    }
  },
  getEmployee: (employeeId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getEmployee.json')
    }
  },
  deleteEmployee: (employeeId) => {
    return {
      ok: true
    }
  },

  updateJob: (job) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateJob.json')
    }
  },
  getJobs: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getJobs.json')
    }
  },
  getJob: (jobId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getJob.json')
    }
  },
  deleteJob: (jobId) => {
    return {
      ok: true
    }
  },

  updateJobHistory: (jobHistory) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateJobHistory.json')
    }
  },
  getJobHistories: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getJobHistories.json')
    }
  },
  getJobHistory: (jobHistoryId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getJobHistory.json')
    }
  },
  deleteJobHistory: (jobHistoryId) => {
    return {
      ok: true
    }
  },
  // ignite-jhipster-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/updateUser.json')
    }
  },
  getUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/getUsers.json')
    }
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/getUser.json')
    }
  },
  deleteUser: (userId) => {
    return {
      ok: true
    }
  },
  // auth fixtures
  setAuthToken: () => {

  },
  removeAuthToken: () => {

  },
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json')
      }
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials'
      }
    }
  },
  register: ({user}) => {
    if (user === 'user') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  forgotPassword: ({email}) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      data: require('../fixtures/get-account.json')
    }
  },
  updateAccount: () => {
    return {
      ok: true
    }
  },
  changePassword: ({currentPassword}) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Password error'
      }
    }
  }
}
