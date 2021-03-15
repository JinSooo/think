import { get } from './ajax'

// 获取热度榜数据
export const getHot = () => get('/hotList')
