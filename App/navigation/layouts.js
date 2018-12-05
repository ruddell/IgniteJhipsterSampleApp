import { AppState, Linking } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import { Images } from '../shared/themes'
// import { StorybookUIRoot } from '../../storybook'

import createStore from '../shared/reducers'
import Colors from '../shared/themes/colors'
import '../config/reactotron-config'
import AccountActions from '../shared/reducers/account.reducer'

import LoginScreen from '../modules/login/login-screen'
import LaunchScreen from '../modules/home/launch-screen'
import DrawerContent from './drawer/drawer-content'
import SettingsScreen from '../modules/account/settings/settings-screen'
import RegisterScreen from '../modules/account/register/register-screen'
import ForgotPasswordScreen from '../modules/account/password-reset/forgot-password-screen'
import ChangePasswordScreen from '../modules/account/password/change-password-screen'
import EntitiesScreen from '../modules/entities/entities-screen'
import RegionEntityScreen from '../modules/entities/region/region-entity-screen'
import RegionEntityDetailScreen from '../modules/entities/region/region-entity-detail-screen'
import RegionEntityEditScreen from '../modules/entities/region/region-entity-edit-screen'
import CountryEntityScreen from '../modules/entities/country/country-entity-screen'
import CountryEntityDetailScreen from '../modules/entities/country/country-entity-detail-screen'
import CountryEntityEditScreen from '../modules/entities/country/country-entity-edit-screen'
import LocationEntityScreen from '../modules/entities/location/location-entity-screen'
import LocationEntityDetailScreen from '../modules/entities/location/location-entity-detail-screen'
import LocationEntityEditScreen from '../modules/entities/location/location-entity-edit-screen'
import DepartmentEntityScreen from '../modules/entities/department/department-entity-screen'
import DepartmentEntityDetailScreen from '../modules/entities/department/department-entity-detail-screen'
import DepartmentEntityEditScreen from '../modules/entities/department/department-entity-edit-screen'
import TaskEntityScreen from '../modules/entities/task/task-entity-screen'
import TaskEntityDetailScreen from '../modules/entities/task/task-entity-detail-screen'
import TaskEntityEditScreen from '../modules/entities/task/task-entity-edit-screen'
import EmployeeEntityScreen from '../modules/entities/employee/employee-entity-screen'
import EmployeeEntityDetailScreen from '../modules/entities/employee/employee-entity-detail-screen'
import EmployeeEntityEditScreen from '../modules/entities/employee/employee-entity-edit-screen'
import JobEntityScreen from '../modules/entities/job/job-entity-screen'
import JobEntityDetailScreen from '../modules/entities/job/job-entity-detail-screen'
import JobEntityEditScreen from '../modules/entities/job/job-entity-edit-screen'
import JobHistoryEntityScreen from '../modules/entities/job-history/job-history-entity-screen'
import JobHistoryEntityDetailScreen from '../modules/entities/job-history/job-history-entity-detail-screen'
import JobHistoryEntityEditScreen from '../modules/entities/job-history/job-history-entity-edit-screen'
// ignite-jhipster-navigation-import-needle

export const LOGIN_SCREEN = 'nav.LoginScreen'
export const REGISTER_SCREEN = 'nav.RegisterScreen'
export const FORGOT_PASSWORD_SCREEN = 'nav.ForgotPasswordScreen'
export const CHANGE_PASSWORD_SCREEN = 'nav.ChangePasswordScreen'
export const SETTINGS_SCREEN = 'nav.SettingsScreen'
export const LAUNCH_SCREEN = 'nav.LaunchScreen'
export const DRAWER_CONTENT = 'nav.DrawerContent'
export const ENTITIES_SCREEN = 'nav.EntitiesScreen'
export const REGION_ENTITY_SCREEN = 'Nav.RegionEntityScreen'
export const REGION_ENTITY_DETAIL_SCREEN = 'Nav.RegionEntityDetailScreen'
export const REGION_ENTITY_EDIT_SCREEN = 'Nav.RegionEntityEditScreen'
export const COUNTRY_ENTITY_SCREEN = 'Nav.CountryEntityScreen'
export const COUNTRY_ENTITY_DETAIL_SCREEN = 'Nav.CountryEntityDetailScreen'
export const COUNTRY_ENTITY_EDIT_SCREEN = 'Nav.CountryEntityEditScreen'
export const LOCATION_ENTITY_SCREEN = 'Nav.LocationEntityScreen'
export const LOCATION_ENTITY_DETAIL_SCREEN = 'Nav.LocationEntityDetailScreen'
export const LOCATION_ENTITY_EDIT_SCREEN = 'Nav.LocationEntityEditScreen'
export const DEPARTMENT_ENTITY_SCREEN = 'Nav.DepartmentEntityScreen'
export const DEPARTMENT_ENTITY_DETAIL_SCREEN = 'Nav.DepartmentEntityDetailScreen'
export const DEPARTMENT_ENTITY_EDIT_SCREEN = 'Nav.DepartmentEntityEditScreen'
export const TASK_ENTITY_SCREEN = 'Nav.TaskEntityScreen'
export const TASK_ENTITY_DETAIL_SCREEN = 'Nav.TaskEntityDetailScreen'
export const TASK_ENTITY_EDIT_SCREEN = 'Nav.TaskEntityEditScreen'
export const EMPLOYEE_ENTITY_SCREEN = 'Nav.EmployeeEntityScreen'
export const EMPLOYEE_ENTITY_DETAIL_SCREEN = 'Nav.EmployeeEntityDetailScreen'
export const EMPLOYEE_ENTITY_EDIT_SCREEN = 'Nav.EmployeeEntityEditScreen'
export const JOB_ENTITY_SCREEN = 'Nav.JobEntityScreen'
export const JOB_ENTITY_DETAIL_SCREEN = 'Nav.JobEntityDetailScreen'
export const JOB_ENTITY_EDIT_SCREEN = 'Nav.JobEntityEditScreen'
export const JOB_HISTORY_ENTITY_SCREEN = 'Nav.JobHistoryEntityScreen'
export const JOB_HISTORY_ENTITY_DETAIL_SCREEN = 'Nav.JobHistoryEntityDetailScreen'
export const JOB_HISTORY_ENTITY_EDIT_SCREEN = 'Nav.JobHistoryEntityEditScreen'
// ignite-jhipster-navigation-declaration-needle

const store = createStore()

export const appStack = {
  root: {
    sideMenu: {
      left: {
        component: {
          name: DRAWER_CONTENT
        }
      },
      center: {
        stack: {
          id: 'center',
          children: [{
            component: {
              name: LAUNCH_SCREEN,
              options: {
                topBar: {
                  title: {
                    text: 'Welcome!',
                    color: Colors.snow
                  },
                  leftButtons: [
                    {
                      id: 'menuButton',
                      icon: Images.menuIcon,
                      testID: 'menuButton'
                    }
                  ]
                }
              }
            }
          }]
        }
      }
    }
  }
}

let lastAppState = 'active'
function handleAppStateChange (nextAppState) {
  if (lastAppState.match(/inactive|background/) && nextAppState === 'active') {
    refreshAccount(store)
  }
  lastAppState = nextAppState
}

function refreshAccount () {
  store.dispatch(AccountActions.accountRequest())
}
// for deep linking
function handleOpenURL (event) {
  console.tron.log(event.url)
  let splitUrl = event.url.split('/')             // ['https:', '', 'domain', 'route', 'params']
  let importantParameters = splitUrl.splice(3)    // ['route', 'params']
  if (importantParameters.length === 0) {
    console.tron.log('Sending to home page')
    return null
  }
  if (importantParameters.length === 1) {
    switch (importantParameters[0]) {
      case 'register':
        console.tron.log(`Sending to Register Page`)
        registerScreen()
        break
      default:
        console.tron.warn(`Unhandled deep link: ${event.url}`)
      // default code block
    }
  }
}

export function registerScreensAndStartApp () {
  Navigation.registerComponentWithRedux(LOGIN_SCREEN, () => LoginScreen, Provider, store)
  Navigation.registerComponentWithRedux(REGISTER_SCREEN, () => RegisterScreen, Provider, store)
  Navigation.registerComponentWithRedux(FORGOT_PASSWORD_SCREEN, () => ForgotPasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(CHANGE_PASSWORD_SCREEN, () => ChangePasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(SETTINGS_SCREEN, () => SettingsScreen, Provider, store)
  Navigation.registerComponentWithRedux(DRAWER_CONTENT, () => DrawerContent, Provider, store)
  Navigation.registerComponentWithRedux(LAUNCH_SCREEN, () => LaunchScreen, Provider, store)
  Navigation.registerComponentWithRedux(ENTITIES_SCREEN, () => EntitiesScreen, Provider, store)
  Navigation.registerComponentWithRedux(REGION_ENTITY_SCREEN, () => RegionEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(REGION_ENTITY_DETAIL_SCREEN, () => RegionEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(REGION_ENTITY_EDIT_SCREEN, () => RegionEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(COUNTRY_ENTITY_SCREEN, () => CountryEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(COUNTRY_ENTITY_DETAIL_SCREEN, () => CountryEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(COUNTRY_ENTITY_EDIT_SCREEN, () => CountryEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(LOCATION_ENTITY_SCREEN, () => LocationEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(LOCATION_ENTITY_DETAIL_SCREEN, () => LocationEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(LOCATION_ENTITY_EDIT_SCREEN, () => LocationEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(DEPARTMENT_ENTITY_SCREEN, () => DepartmentEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(DEPARTMENT_ENTITY_DETAIL_SCREEN, () => DepartmentEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(DEPARTMENT_ENTITY_EDIT_SCREEN, () => DepartmentEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(TASK_ENTITY_SCREEN, () => TaskEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(TASK_ENTITY_DETAIL_SCREEN, () => TaskEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(TASK_ENTITY_EDIT_SCREEN, () => TaskEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(EMPLOYEE_ENTITY_SCREEN, () => EmployeeEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(EMPLOYEE_ENTITY_DETAIL_SCREEN, () => EmployeeEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(EMPLOYEE_ENTITY_EDIT_SCREEN, () => EmployeeEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(JOB_ENTITY_SCREEN, () => JobEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(JOB_ENTITY_DETAIL_SCREEN, () => JobEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(JOB_ENTITY_EDIT_SCREEN, () => JobEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(JOB_HISTORY_ENTITY_SCREEN, () => JobHistoryEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(JOB_HISTORY_ENTITY_DETAIL_SCREEN, () => JobHistoryEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(JOB_HISTORY_ENTITY_EDIT_SCREEN, () => JobHistoryEntityEditScreen, Provider, store)
  // ignite-jhipster-navigation-registration-needle

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: {
        topBar: {
          title: {
            color: Colors.snow
          }
        },
        backButton: {
          showTitle: false,
          testID: 'backButton',
          icon: Images.chevronLeftIcon,
          color: Colors.snow,
          iconColor: Colors.snow
        },
        background: {
          color: Colors.background
        }
      },
      sideMenu: {
        left: {
          enabled: false
        }
      }
    })

    Navigation.setRoot(appStack)

    // handle app state and deep links
    AppState.addEventListener('change', handleAppStateChange)
    Linking.addEventListener('url', handleOpenURL)
  })
}

export const loginScreen = () => Navigation.showModal({
  stack: {
    children: [{
      component: {
        name: LOGIN_SCREEN,
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    }]
  }
})

export const registerScreen = () => Navigation.push('center', {
  component: {
    name: REGISTER_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Sign Up',
          color: Colors.snow
        }
      }
    }
  }
})

export const forgotPasswordScreen = () => Navigation.push('center', {
  component: {
    name: FORGOT_PASSWORD_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Forgot Password',
          color: Colors.snow
        }
      }
    }
  }
})
export const changePasswordScreen = () => Navigation.push('center', {
  component: {
    name: CHANGE_PASSWORD_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Change Password',
          color: Colors.snow
        }
      }
    }
  }
})
export const settingsScreen = () => Navigation.push('center', {
  component: {
    name: SETTINGS_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Settings',
          color: Colors.snow
        }
      }
    }
  }
})

export const entitiesScreen = () => Navigation.push('center', {
  component: {
    name: ENTITIES_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Entities',
          color: Colors.snow
        }
      }
    }
  }
})

export const regionEntityScreen = () => Navigation.push('center', {
  component: {
    name: REGION_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Regions',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const regionEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: REGION_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Regions',
          color: Colors.snow
        }
      }
    }
  }
})

export const regionEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: REGION_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Regions',
          color: Colors.snow
        }
      }
    }
  }
})

export const countryEntityScreen = () => Navigation.push('center', {
  component: {
    name: COUNTRY_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Countries',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const countryEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: COUNTRY_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Countries',
          color: Colors.snow
        }
      }
    }
  }
})

export const countryEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: COUNTRY_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Countries',
          color: Colors.snow
        }
      }
    }
  }
})

export const locationEntityScreen = () => Navigation.push('center', {
  component: {
    name: LOCATION_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Locations',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const locationEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: LOCATION_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Locations',
          color: Colors.snow
        }
      }
    }
  }
})

export const locationEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: LOCATION_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Locations',
          color: Colors.snow
        }
      }
    }
  }
})

export const departmentEntityScreen = () => Navigation.push('center', {
  component: {
    name: DEPARTMENT_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Departments',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const departmentEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: DEPARTMENT_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Departments',
          color: Colors.snow
        }
      }
    }
  }
})

export const departmentEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: DEPARTMENT_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Departments',
          color: Colors.snow
        }
      }
    }
  }
})

export const taskEntityScreen = () => Navigation.push('center', {
  component: {
    name: TASK_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Tasks',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const taskEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: TASK_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Tasks',
          color: Colors.snow
        }
      }
    }
  }
})

export const taskEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: TASK_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Tasks',
          color: Colors.snow
        }
      }
    }
  }
})

export const employeeEntityScreen = () => Navigation.push('center', {
  component: {
    name: EMPLOYEE_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Employees',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const employeeEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: EMPLOYEE_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Employees',
          color: Colors.snow
        }
      }
    }
  }
})

export const employeeEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: EMPLOYEE_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Employees',
          color: Colors.snow
        }
      }
    }
  }
})

export const jobEntityScreen = () => Navigation.push('center', {
  component: {
    name: JOB_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Jobs',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const jobEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: JOB_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Jobs',
          color: Colors.snow
        }
      }
    }
  }
})

export const jobEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: JOB_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Jobs',
          color: Colors.snow
        }
      }
    }
  }
})

export const jobHistoryEntityScreen = () => Navigation.push('center', {
  component: {
    name: JOB_HISTORY_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'JobHistories',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const jobHistoryEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: JOB_HISTORY_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'JobHistories',
          color: Colors.snow
        }
      }
    }
  }
})

export const jobHistoryEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: JOB_HISTORY_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'JobHistories',
          color: Colors.snow
        }
      }
    }
  }
})
// ignite-jhipster-navigation-method-needle
