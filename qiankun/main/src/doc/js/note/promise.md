# 23个Promise高级用法

[参考链接](https://mp.weixin.qq.com/s/A3Lelnef7dNY5Z0KhLRObA)

## 并发控制

使用Promise.all可以并行执行多个Promise，但当需要控制并发的请求数量时，可以通过实现一个并发控制函数来控制同时执行的Promise数量。
``` javascript
const concurrentPromises = (promises, limit) => {
  return new Promise((resolve, reject) => {
    let i = 0;
    let result = [];
    const executor = () => {
      if (i >= promises.length) {
        return resolve(result);
      }
      const promise = promises[i++];
      Promise.resolve(promise)
        .then(value => {
          result.push(value);
          if (i < promises.length) {
            executor();
          } else {
            resolve(result);
          }
        })
        .catch(reject);
    };
    for (let j = 0; j < limit && j < promises.length; j++) {
      executor();
    }
  });
};
```
## Promise超时

有时候，我们希望Promise在一定时间内如果没有得到解决就自动reject。这可以用下面的方式实现。

```javascript
const promiseWithTimeout = (promise, ms) =>  
    Promise.race([
        promise,
        new Promise((resolve, reject) =>
            setTimeout(() => reject(new Error('Timeout after 'ms + 'ms')), ms)
    )
]);
```
## Promise的取消

JavaScript原生的Promise是无法取消的，但我们可以通过引入一个可控的中断逻辑来模拟取消Promise。
```javascript
const promiseWithTimeout = (promise, ms) =>
  Promise.race([
    promise,
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error('Timeout after ' + ms + 'ms')), ms)
    )
]);
```
## 检测Promise状态

原生的Promise不允许直接查询状态。但可以通过一定的技巧来了解当前Promise是否已解决、被拒绝或尚未解决。
```javascript
const reflectPromise = promise =>
  promise.then(
    value => ({ status: 'fulfilled', value }),
    error => ({ status: 'rejected', error })
  );
```

## 顺序执行Promise数组

有时候我们需要按顺序执行一组Promise，以确保前一个异步操作完成后再开始下一个。
```javascript
const sequencePromises = promises =>
  promises.reduce(
    (prev, next) => prev.then(() => next()),
    Promise.resolve()
  );
```

## 基于条件的Promise链

在某些场合下，需要根据条件判断是否执行下一个Promise。
```javascript
const conditionalPromise = (conditionFn, promise) =>
  conditionFn() ? promise : Promise.resolve();
```

## Promise的重试逻辑

当Promise因为某些暂时性的错误被拒绝时，可能希望能够重试执行。
```javascript
const retryPromise = (promiseFn, maxAttempts, interval) => {
  return new Promise((resolve, reject) => {
    const attempt = attemptNumber => {
      if (attemptNumber === maxAttempts) {
        reject(new Error('Max attempts reached'));
        return;
      }
      promiseFn().then(resolve).catch(() => {
        setTimeout(() => {
          attempt(attemptNumber + 1);
        }, interval);
      });
    };
    attempt(0);
  });
};
```

## 确保Promise只解决一次

在某些情况下，可能希望确保Promise只会解决一次，即使可能会被多次调用resolve。
```javascript
const onceResolvedPromise = executor => {
  let isResolved = false;
  return new Promise((resolve, reject) => {
    executor(
      value => {
        if (!isResolved) {
          isResolved = true;
          resolve(value);
        }
      },
      reject
    );
  });
};
```

## 使用Promise.allSettled处理多个异步操作

与Promise.all不同的是，Promise.allSettled会等到所有的prromise都结束后才完成，无论每个promise结束后是fulfilled还是rejected。
```javascript
const promises = [fetch('/api/endpoint1'), fetch('/api/endpoint2')];
Promise.allSettled(promises).then(results => {
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Promise ${index + 1} succeeded with value ${result.value}`);
    } else {
      console.error(`Promise ${index + 1} failed with reason ${result.reason}`);
    }
  });
});
```

## 处理多个Promises的最快响应

当处理多个异步请求，而只关心最快回应的结果时，可以使用Promise.race来实现。

```javascript
const promises = [fetch('/api/endpointA'), fetch('/api/endpointB')];
Promise.race(promises)
  .then(value => {
    // 处理最快的响应
  })
  .catch(reason => {
    // 处理最早的拒绝
  });
```
## 使用async/await简化Promise

async和await关键字可以让异步代码看起来更像同步代码，使得逻辑更清晰。
```javascript
async function asyncFunction() {
  try {
    const result = await aPromise;
    // Do something with result
  } catch (error) {
    // Handle error
  }
}
```

## 连续获取不确定数量的数据页

当获取分页数据时，我们可能不知道一共有多少页，可以采取递归的方式直到取完所有页。

```javascript
async function fetchPages(apiEndpoint, page = 1, allResults = []) {
  const response = await fetch(`${apiEndpoint}?page=${page}`);
  const data = await response.json();
  if (data.nextPage) {
    return fetchPages(apiEndpoint, page + 1, allResults.concat(data.results));
  } else {
    return allResults.concat(data.results);
  }
}
```
## 映射并发Promises并处理结果数组

当需要并发执行异步函数并处理所有结果时，可以使用Promise.all。

```javascript
const fetchUrls = urls => {
  const fetchPromises = urls.map(url => fetch(url).then(response => response.json()));
  return Promise.all(fetchPromises);
};
```

## 使用Generators管理流程

通过将async/await与Generators配合，可以创建一个可控制的异步流程管理器。

```javascript
function* asyncGenerator() {
  const result1 = yield aPromise1;
  const result2 = yield aPromise2(result1);
  // ...
}
```

## 使用Promises替代回调

Promise提供了一种更标准和便捷的方式来处理异步操作，将回调函数替换为Promise。

```javascript
const callbackToPromise = (fn, ...args) => {
  return new Promise((resolve, reject) => {
    fn(...args, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
```

## 流式处理大型数据集

使用Promise处理大型数据集时，最好是流式地获取和处理这些数据，以避免内存过载。

```javascript
async function processLargeDataSet(dataSet) {
  for (const dataChunk of dataSet) {
    const processedChunk = await process(dataChunk); // Returns a Promise
    await save(processedChunk); // Another async operation
  }
}
```

## 同时执行多个异步任务并处理中途的失败

有时即便其中一个异步任务失败了，也希望其他任务能够顺利完成。

```javascript
const promises = [promise1, promise2, promise3];
Promise.all(promises.map(reflectPromise)).then(results => {
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      // Do something with result.value
    } else {
      // Handle result.error
    }
  });
});
```

## Promise-pipeline

通过管道化promise可以依次执行一系列异步操作。

```javascript
const promisePipe = (...fns) => value => fns.reduce((p, f) => p.then(f), Promise.resolve(value));
```

## 使用promise实现一个延时

可以使用Promise结合setTimeout来实现一个异步的延时函数。
```javascript
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
```

## 动态生成Promise链

在一些情况下，可能需要根据不同条件动态生成一系列的Promise链。
```javascript
const tasks = [task1, task2, task3]; // Array of asynchronous tasks

const promiseChain = tasks.reduce((chain, currentTask) => {
  return chain.then(currentTask);
}, Promise.resolve());
```

## 使用Promise实现简易的异步锁

在多线程环境中，可以使用Promise来实现一个简易的异步锁。

```javascript
let lock = Promise.resolve();

const acquireLock = () => {
  let release;
  const waitLock = new Promise(resolve => {
    release = resolve;
  });
  const tryAcquireLock = lock.then(() => release);
  lock = waitLock;
  return tryAcquireLock;
};
```

## 组合多个Promise操作为一个函数

可以将多个Promise操作合并为一个函数，通过函数复用减少冗余代码。

```javascript
const fetchDataAndProcess = async url => {
  const data = await fetch(url).then(resp => resp.json());
  return processData(data);
};
```

## 处理可选的异步操作

有些场合下，一个异步操作是可选的，可以使用下面的方式来处理。

```javascript
async function optionallyAsyncTask(condition, asyncOperation, fallbackValue) {
  if (condition) {
    return await asyncOperation;
  } else {
    return fallbackValue;
  }
}
```

结语
Promise是现代JavaScript异步编程不可或缺的一部分，精通其高级技巧将大大提升开发效率和代码质量。通过上面介绍的多种用法，开发者们可以更自信地处理各种复杂的异步场景，并能够写出更可读、更优雅、更健壮的代码。
