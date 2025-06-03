type BrickProps = {
    value: number;
    index: number;
    handleBrickClick: (index: number) => void;
  };

   export const Brick = (props: BrickProps) => {
    return (
      <div 
      className={`brick ${props.value === 0 ? "hidden-brick" : ""}`} 
      onClick={() => props.handleBrickClick(props.index)}
      >
        {props.value === 0 ? "" : props.value}
      </div>
    );
  };
 