type headingProps = {
  winStatus: boolean;
}

export const Heading = (props: headingProps) => {
    return (
      <h2>{props.winStatus ? "Hurray! 🎉" : "Let's Play!"}</h2>
      );
}