'use strict';

module.exports = function untab(){
  const chunks = Array.prototype.shift.call(arguments);
  const values = Array.prototype.slice.call(arguments, 0);

  let indent = 0;
  return chunks.map((chunk, index) => {
    if(index > 0) return chunk;

    if(chunk[0] === '\r' || chunk[0] === '\n'){
      while(chunk[0] === '\r' || chunk[0] === '\n'){
        chunk = chunk.substr(1);
      }
      indent = countLeadingSpaces(chunk);

      return chunk.substr(indent);
    }

    let start = 0;
    while(chunk[start] !== ' ' && chunk[start] != '\t'){
      start++;
    }

    indent = countLeadingSpaces(chunk, start);
    if(start !== 0){
      return chunk;
    }

    return chunk.substr(indent);
  }).map(chunk => {
    return chunk.split(/(?:\r\n|\n|\r)/).map((line, index) => {
      if(index === 0) return line;
      const remove = Math.min(indent, countLeadingSpaces(line));
      return line.substr(remove);
    }).join('\n');
  }).map((chunk, index) => chunk + (index < values.length ? values[index] : '')).join('');
};

function countLeadingSpaces(line, start){
  let count = start || 0;
  while(line[count] === ' ' || line[count] === '\t'){
    count++;
  }
  return count - (start || 0);
}
