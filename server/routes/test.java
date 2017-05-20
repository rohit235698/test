

void _printParenthesis(int pos, int n, int open, int close)
{
  static char str[MAX_SIZE];     
 
  if(close == n) 
  {
    printf("%s \n", str);
    return;
  }
  else
  {
    if(open > close) {
        str[pos] = '}';
        _printParenthesis(pos+1, n, open, close+1);
    }
    if(open < n) {
       str[pos] = '{';
       _printParenthesis(pos+1, n, open+1, close);
    }
  }
}