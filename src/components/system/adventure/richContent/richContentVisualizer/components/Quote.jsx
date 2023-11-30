import StringHelper from "~/helpers/StringHelper";

function Quote({ from = null, children, ...props }) {
  return (
    <div className="bg-white/20 px-1">
      {!StringHelper.isNullOrEmpty(from) && (
        <div className="ml-1 text-xs font-semibold text-ocre-500/40">
          {from}:
        </div>
      )}

      <div className="flex gap-1">
        <div className="flex-none text-xl text-ocre-500 opacity-20">
          <i className="fa fa-angles-left" />
        </div>
        <div className="my-1.5 flex-1 text-xs italic">{children}</div>
        <div className="flex-none self-end text-xl text-ocre-500 opacity-20">
          <i className="fa fa-angles-right" />
        </div>
      </div>
    </div>
  );
}

export default Quote;
