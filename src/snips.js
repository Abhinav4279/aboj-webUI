const snips = {};

snips.cpp = `#include <iostream>
#include <stdio.h>
using namespace std;

int N = 1000;   //change value of N to see different status

int main() {
  for(int i = 0; i < N; i++) {
    //delay
  }

  cout << "Hello world!";
  return 0;
}
`;

snips.asm = `          global    _start

section   .text
_start:   mov       rax, 1        ; system call for write
mov       rdi, 1                  ; file handle 1 is stdout
mov       rsi, message            ; address of string to output
mov       rdx, 13                 ; number of bytes
syscall                           ; invoke operating system to do the write
mov       rax, 60                 ; system call for exit
xor       rdi, rdi                ; exit code 0
syscall                           ; invoke operating system to exit

section   .data
message:  db        "Hello, World", 10      ; note the newline at the end
`;

export default snips;