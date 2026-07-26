import Mock from 'mockjs'

const data = Mock.mock({
  'users|100': [{
    'id|+1': 1,
    name: '@name',
    age: '@integer(18, 60)',
    email: '@email',
  }]
})

export const mockApiConfig = {
  '/api/users' :{
    url: '/api/users',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: data.users,
      }
    }
  },
}