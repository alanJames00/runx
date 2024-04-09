const { parse, createVisitor } = require('java-ast');

const countMethods = (source) => {
  let ast = parse(source);

  let mainClassName = null;

  createVisitor({
    visitClassDeclaration: (node) => {
      if (node.modifiers.includes('public')) {
        node.body.declarations.forEach((declaration) => {
          if (declaration.kind === 'MethodDeclaration' && declaration.name.identifier === 'main') {
            mainClassName = node.name.identifier;
          }
        });
      }
    }
  }).visit(ast);

  return mainClassName; 
};

console.log(
  countMethods(`
   public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!"); 
    }
}
  `),
); // logs 3