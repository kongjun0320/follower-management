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

export const updateUser = (id, data) => {
  return request({
    url: `/user/${id}`,
    method: 'PATCH',
    data
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

export const getProduct = (data) => {
  return request({
    url: '/product',
    method: 'GET',
    params: data
  })
}

export const getProductById = (id) => {
  return request({
    url: `/product/${id}`,
    method: 'GET'
  })
}

export const addProduct = (data) => {
  return request({
    url: '/product',
    method: 'POST',
    data
  })
}

export const delProduct = (id) => {
  return request({
    url: `/product/${id}`,
    method: 'DELETE'
  })
}

export const getCategory = (data) => {
  return request({
    url: `/category`,
    method: 'GET',
    params: data
  })
}

export const getCategoryById = (id) => {
  return request({
    url: `/category/${id}`,
    method: 'GET'
  })
}

export const addProductToCategory = (id, data) => {
  return request({
    url: `/category/${id}`,
    method: 'patch',
    data
  })
}

export const updateOrder = (id, data) => {
  return request({
    url: `/order/${id}`,
    method: 'PATCH',
    data
  })
}

export const updateProduct = (id, data) => {
  return request({
    url: `/product/${id}`,
    method: 'PATCH',
    data
  })
}

export const addCategory = (data) => {
  return request({
    url: '/category',
    method: 'POST',
    data
  })
}

export const delCategory = (id) => {
  return request({
    url: `/category/${id}`,
    method: 'DELETE'
  })
}

export const updateCategory = (id, data) => {
  return request({
    url: `/category/${id}`,
    method: 'PATCH',
    data
  })
}
