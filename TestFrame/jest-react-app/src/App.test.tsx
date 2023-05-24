import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

test('test-learn react link', () => {
  render(<App />);

  // 这里是通过快照查找页面上 learn react 链接
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument(); // 期望链接显示
  expect(linkElement).toHaveAttribute('href', 'https://reactjs.org');
});

test('test-btn function', () => {
  render(<App />);

  // 通过 getByTestId 获取这个按钮
  const btnEle = screen.getByTestId('btn');
  expect(btnEle).toBeInTheDocument();

  // fireEvent 产生一个点击事件
  fireEvent.click(btnEle);
  // 检查值是否符合预期
  expect(btnEle).toHaveAttribute('data-value', '1');
});

test('test-list add/removeUser', () => {
  render(<App />);

  const inputEle = screen.getByTestId('userInput') as HTMLInputElement;
  const addBtnEle = screen.getByTestId('addUserBtn');
  const userListEle = screen.getByTestId('userList');
  expect(inputEle).toBeInTheDocument();
  expect(addBtnEle).toBeInTheDocument();

  // 创建一个 testUser
  fireEvent.change(inputEle, { target: { value: 'testUser' } });
  fireEvent.click(addBtnEle);

  // 检查数组长度是否符合预期 ( getAllByRole 用的是 HTML标签全称 比如 li -> listitem)
  const currentListItems = within(userListEle).getAllByRole('listitem');
  expect(currentListItems).toHaveLength(4);
  // 检查值 (取掉末尾 x)
  expect(currentListItems[3].textContent?.slice(0, -1)).toBe('testUser');

  // 删除用户
  const deleteBtn = screen.getByTestId('removeBtn-item-3');
  fireEvent.click(deleteBtn);
  // 检查删除是否成功
  expect(deleteBtn).not.toBeInTheDocument();
  expect(within(userListEle).getAllByRole('listitem')).toHaveLength(3);
});
