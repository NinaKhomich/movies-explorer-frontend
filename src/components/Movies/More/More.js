import "./More.css";

const More = ({ showMore }) => {
  return (
    <div className="more">
      <button onClick={showMore} className={`more__btn`} type="button">
        Ещё
      </button>
    </div>
  );
};

export default More;
