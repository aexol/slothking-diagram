import * as React from 'react';
import { LinkType, NodeType, PortType, LinkWidget } from '..';

export const renderLinks = (
  links: Array<LinkType>,
  nodes: Array<NodeType>,
  oX: (x: number) => number,
  oY: (y: number) => number
) =>
  links.map((l: LinkType) => {
    let { x: startX, y: startY, inputs: startInputs, outputs: startOutputs } = nodes.find(
      (n: NodeType) => n.id === l.from.nodeId
    );
    let { x: startPortX, y: startPortY } = [...startInputs, ...startOutputs].find(
      (i: PortType) => i.id === l.from.portId
    );
    let { x: endX, y: endY, inputs: endInputs, outputs: endOutputs } = nodes.find(
      (n: NodeType) => n.id === l.to.nodeId
    );
    let { x: endPortX, y: endPortY } = [...endInputs, ...endOutputs].find(
      (i: PortType) => i.id === l.to.portId
    );
    return (
      <LinkWidget
        key={`${l.from.portId}-${l.to.portId}`}
        start={{
          x: oX(startX + startPortX),
          y: oY(startY + startPortY)
        }}
        end={{
          x: oX(endX + endPortX),
          y: oY(endY + endPortY)
        }}
      />
    );
  });
