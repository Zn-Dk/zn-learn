

export const getAllPath = (nums: number[]): number[][] => {
  const res: number[][] = [];
  const curr: number[] = [];
  const used: boolean[] = new Array(nums.length).fill(false);
  
  const bt = () => {
    if (curr.length === nums.length) {
      res.push([...curr]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      curr.push(nums[i]!)
      used[i] = true
      bt()
      curr.pop()
      used[i] = false
    }

  }

  bt()
  return res;
}

console.log(getAllPath([1,2,3]));
