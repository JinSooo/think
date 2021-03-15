const aList = [...document.querySelectorAll('.cloud li a')]
const ul = document.querySelector('.cloud')

// 遍历设置权重
aList.forEach(a => {
  a.style.fontSize = a.getAttribute('data-weight') * 0.25 + 0.5 + 'rem'
  a.style.opacity = a.getAttribute('data-weight') * 0.2
})

console.log(aList[0].getAttribute('data-weight'))
// console.log(ul.getAttribute('data-weight'))
