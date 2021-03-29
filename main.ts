import rough from "roughjs";
import { treeFromArray } from "treevis/tree";

type NodeValue = number | string | null;
const $canvas = document.querySelector("#canvas") as HTMLCanvasElement;

const canvasWidth = 1000;
const canvasHeight = 1000;

const rc = rough.canvas($canvas);
const ctx = $canvas.getContext("2d");

interface TreeNode {
  left?: TreeNode;
  right?: TreeNode;
  val: NodeValue;
}

function make(tree: Array<NodeValue>) {
  $canvas.width = canvasWidth;
  $canvas.height = canvasHeight;

  const t = treeFromArray(tree) as TreeNode;
  const r = 20;

  function draw(node: TreeNode, position: [number, number], s) {
    let x = position[0];
    let y = position[1];
    ctx.font = `${r / 1}px serif`;

    ctx.fillText(`${node.val}`, x - r / 4, y + r / 3);
    rc.circle(x, y, r * 2);

    if (node.left) {
      const leftPosition = [x - s, y + r * 4] as [number, number];
      draw(node.left, leftPosition, s / 1.5);
      rc.line(x, y + r, leftPosition[0], leftPosition[1] - r);
    }

    if (node.right) {
      const rightPosition = [x + s, y + r * 4] as [number, number];
      rc.line(x, y + r, rightPosition[0], rightPosition[1] - r);
      draw(node.right, rightPosition, s / 1.5);
    }
  }

  draw(t, [canvasWidth / 2, 100], r * 6);
}


document.querySelector('#generate').addEventListener('click', () => {
  const $array = document.querySelector('#array') as HTMLTextAreaElement
  make(JSON.parse($array.value))
})
