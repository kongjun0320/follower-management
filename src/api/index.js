import request from './request'

export const login = (data) => {
  return request({
    url: `/user/login`,
    method: 'POST',
    data
  })
}

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

export const getOrder = (data) => {
  return request({
    url: '/order',
    method: 'GET',
    params: data
  })
}

export const getOrderById = (id) => {
  return request({
    url: `/order/${id}`,
    method: 'GET'
  })
}

export const addOrder = (data) => {
  return request({
    url: '/order',
    method: 'POST',
    data
  })
}

export const delOrder = (id) => {
  return request({
    url: `/order/${id}`,
    method: 'DELETE'
  })
}
