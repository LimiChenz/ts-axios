function fun1(n){
    if (n<=1) return n;
    console.log(fun1(n-1) + fun1(n-2));
    return fun1(n-1) + fun1(n-2)
}


console.log(fun1(6));