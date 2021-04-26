import request from './request'

export const getUser = (data) => {
  return request({
    url: '/user',
    method: 'GET',
    params: data
  })
}

export const getUserById = (id) => {
  return request({
    url: `/user/${id}`,
    method: 'GET'
  })
}

export const addUser = (data) => {
  return request({
    url: '/user',
    method: 'POST',
    data
  })
}

export const delUser = (id) => {
  return request({
    url: `/user/${id}`,
    method: 'DELETE'
  })
}
