const obj = {
  'DKH': { 
    '123 123 1234': {
      'USD': {
        'acctArr': {
          'acctId': '1238888888/00',
          'acctShortName': 'XXXXY SSSY USD',
        }
      },
      'RMB': {
        'acctArr': {
          'acctId': '1231231234/08',
          'acctShortName': 'XXXXY RMB',
        }
      },
    },
    '123 888 8888': {
      'EUR': {
        'acctArr': {
          'acctId': '1238888888/06',
          'acctShortName': 'XXXXY SSSY',
        }
      },
      'JPY': {
        'acctArr': {
          'acctId': '1238888888/09',
          'acctShortName': 'XXXXY SSSY',
        }
      },
    },
  },
  'DDD': { 
    '123 123 7777': {
      'USD': {
        'acctArr': {
          'acctId': '1231237777/00',
          'acctShortName': 'DDD SSSY USD',
        }
      },
      'EUR': {
        'acctArr': {
          'acctId': '1231237777/06',
          'acctShortName': 'DDD RMB',
        }
      },
    },
    '123 888 9999': {
      'ERO': {
        'acctArr': {
          'acctId': '1238889999/02',
          'acctShortName': 'DDD ERO SSSY',
        }
      },
      'JPY': {
        'acctArr': {
          'acctId': '1238889999/09',
          'acctShortName': 'DDD JPY SSSC',
        }
      },
    },
  },
}

const getAcctId = o => {
  Object.entries(o).map(i => {
    console.log(i)
  })
}

getAcctId(obj)