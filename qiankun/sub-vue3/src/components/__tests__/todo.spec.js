// import { describe, it, test, expect } from 'vitest'
import { shallowMount  } from '@vue/test-utils'
import Todo from '@/components/Todo/index.vue'

// arrange
// In the arrange phase, we are setting up the scenario for the test. A more complex example may require creating a Vuex store, or populating a database.
describe('MyComponent', () => {
  test('renders a todo', () => {
    const wrapper = shallowMount (Todo);
  
    expect(wrapper.exists()).toBe(true);
  })
});

// act
// In the act phase, we act out the scenario, simulating how a user would interact with the component or application.
// test('creates a todo', async () => {
//   const wrapper = mount(Todo)
//   expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1)

//   await wrapper.get('[data-test="new-todo"]').setValue('New todo')
//   await wrapper.get('[data-test="form"]').trigger('submit')

//   expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2)
// })

// assert
// In the assert phase, we make assertions about how we expect the current state of the component to be.
// test('completes a todo', async () => {
//   const wrapper = mount(Todo)

//   await wrapper.get('[data-test="todo-checkbox"]').setValue(true)

//   expect(wrapper.get('[data-test="todo"]').classes()).toContain('completed')
// })

// 使用 mount() 渲染组件。

// 使用 get() 和 findAll() 查询 DOM。

// trigger() 和 setValue() 是模拟用户输入的助手。

// 更新 DOM 是一个异步操作，因此请确保使用 async 和 await。