/*

Given two strings s1 and s2, we want to visualize how different the two strings are. We will only take into account the lowercase letters (a to z). First let us count the frequency of each lowercase letters in s1 and s2.

  s1 = "A aaaa bb c"
  s2 = "& aaa bbb c d"

  s1 has 4 'a', 2 'b', 1 'c'
  s2 has 3 'a', 3 'b', 1 'c', 1 'd'

So the maximum for 'a' in s1 and s2 is 4 from s1; the maximum for 'b' is 3 from s2. In the following we will not consider letters when the maximum of their occurrences is less than or equal to 1.
We can resume the differences between s1 and s2 in the following string: "1:aaaa/2:bbb" where 1 in 1:aaaa stands for string s1 and aaaa because the maximum for a is 4. In the same manner 2:bbb stands for string s2 and bbb because the maximum for b is 3.
The task is to produce a string in which each lowercase letters of s1 or s2 appears as many times as its maximum if this maximum is strictly greater than 1; these letters will be prefixed by the number of the string where they appear with their maximum value and :. If the maximum is in s1 as well as in s2 the prefix is =:.
In the result, substrings (a substring is for example 2:nnnnn or 1:hhh; it contains the prefix) will be in decreasing order of their length and when they have the same length sorted in ascending lexicographic order (letters and digits - more precisely sorted by codepoint); the different groups will be separated by '/'. See examples and "Example Tests".
Hopefully other examples can make this clearer.

  s1 = "my&friend&Paul has heavy hats! &"
  s2 = "my friend John has many many friends &"
  mix(s1, s2) --> "2:nnnnn/1:aaaa/1:hhh/2:mmm/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss"

  s1 = "mmmmm m nnnnn y&friend&Paul has heavy hats! &"
  s2 = "my frie n d Joh n has ma n y ma n y frie n ds n&"
  mix(s1, s2) --> "1:mmmmmm/=:nnnnnn/1:aaaa/1:hhh/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss"

  s1="Are the kids at home? aaaaa fffff"
  s2="Yes they are here! aaaaa fffff"
  mix(s1, s2) --> "=:aaaaaa/2:eeeee/=:fffff/1:tt/2:rr/=:hh"

*/

const mix = require('../src/mix');

test('0', () => {
  const s1 = 'A bb c aaaa';
  const s2 = '& d aaa bbb c ';
  expect(mix(s1, s2)).toEqual('1:aaaa/2:bbb');
});


test('1', () => {
  const s1 = 'my&friend&Paul has heavy hats! &';
  const s2 = 'my friend John has many many friends &';
  expect(mix(s1, s2)).toEqual('2:nnnnn/1:aaaa/1:hhh/2:mmm/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss');
});

test('2', () => {
  const s1 = 'mmmmm m nnnnn y&friend&Paul has heavy hats! &';
  const s2 = 'my frie n d Joh n has ma n y ma n y frie n ds n&';
  expect(mix(s1, s2)).toEqual('1:mmmmmm/=:nnnnnn/1:aaaa/1:hhh/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss');
});

test('3', () => {
  const s1 = 'Are the kids at home? aaaaa fffff';
  const s2 = 'Yes they are here! aaaaa fffff';
  expect(mix(s1, s2)).toEqual('=:aaaaaa/2:eeeee/=:fffff/1:tt/2:rr/=:hh');
});

/* eslint-disable max-len */
test('4', () => {
  const s1 = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
  const s2 = 'Alice opened the door and found that it led into a small passage, not much larger than a rat-hole: she knelt down and looked along the passage into the loveliest garden you ever saw. How she longed to get out of that dark hall, and wander about among those beds of bright flowers and those cool fountains, but she could not even get her head through the doorway; ‘and even if my head would go through,’ thought poor Alice, ‘it would be of very little use without my shoulders. Oh, how I wish I could shut up like a telescope! I think I could, if I only knew how to begin.’ For, you see, so many out-of-the-way things had happened lately, that Alice had begun to think that very few things indeed were really impossible.';
  expect(mix(s1, s2)).toEqual('2:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/2:ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo/2:ttttttttttttttttttttttttttttttttttttttttttttttttttt/2:hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh/1:sssssssssssssssssssssssssssssssssssssss/2:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/1:nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn/2:llllllllllllllllllllllllllllllllll/1:iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii/2:dddddddddddddddddddddddddddddd/1:rrrrrrrrrrrrrrrrrrrrrrrr/2:uuuuuuuuuuuuuuuuuuuuuuu/1:mmmmmmmmmmmmmmmmmm/1:pppppppppppppppppp/2:gggggggggggggggggg/2:wwwwwwwwwwwwwwww/1:yyyyyyyyyyyyy/1:cccccccccc/2:ffffffffff/2:bbbbbbbb/=:kkkkkkk/2:vvvvvv/1:xx');
});
/* eslint-enable max-len */
