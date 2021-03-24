// 保存的key值
const defaultIndex = 'default_index'

export const setDefaultIndex = data => window.localStorage.setItem(defaultIndex, data)

export const getDefaultIndex = () => window.localStorage.getItem(defaultIndex)
