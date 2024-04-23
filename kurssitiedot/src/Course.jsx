export const Course = (props) => {
  const Header = (props) => {
    return (
      <h2>{props.content}</h2>
    );
  };

  const Part = (props) => {
    return (
      <p>
        {props.content.name} {props.content.exercises}
      </p>
    );
  };

  const Content = (props) => {
    return (
      <div>
        {props.content.map((content, i) => <Part key={i} content={content}></Part>)}
      </div>
    );
  };

  const Total = (props) => {
    return (
      <p>Number of exercises {props.content.reduce((s, p) => s + p.exercises, 0)}</p>
    );
  };

  return (
    <div>
      <Header content={props.course.name}></Header>
      <Content content={props.course.parts}></Content>
      <Total content={props.course.parts}></Total>
    </div>
  );
};

export default Course