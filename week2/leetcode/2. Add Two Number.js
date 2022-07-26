// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.
function ListNode(val) {
  this.val = val;
  this.next = null;
}

var addTwoNumbers = function (l1, l2) {
  var carry = 0;
  var result = new ListNode(0);
  var current = result;
  while (l1 || l2) {
    var sum = carry;
    if (l1) {
      sum += l1.val;
      l1 = l1.next;
    }
    if (l2) {
      sum += l2.val;
      l2 = l2.next;
    }
    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;
  }
  if (carry) {
    current.next = new ListNode(carry);
  }
  return result.next;
};
const result = addTwoNumbers(
  {
    val: 2,
    next: {
      val: 4,
      next: {
        val: 3,
        next: null,
      },
    },
  },
  {
    val: 5,
    next: {
      val: 6,
      next: {
        val: 4,
        next: null,
      },
    },
  }
);
console.log(result);
// Output: 7->0->8
