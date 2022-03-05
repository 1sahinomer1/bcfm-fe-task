const SvgComponent = ({  ...props } ) => (
    <svg
      width={48}
      height={48}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42 10H6v2.594a1.4 1.4 0 0 1 .683.177L24 22.39l17.317-9.62a1.4 1.4 0 0 1 .683-.177V10Zm0 5.609-17.317 9.62a1.406 1.406 0 0 1-1.366 0L6 15.61V38h36V15.609Z"
        fill={'#000'}
      />
    </svg>
  );
  
  export default SvgComponent;