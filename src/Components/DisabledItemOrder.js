export default function DisabledItemOrder({ itemData, imageDirectory }) {
  return (
    <div className="cadre">
      <div className="texte">
        <p className="panierItemTitle" nowrap="true">
          <button className="minibutton-20" disabled="disabled">
            -
          </button>
          &nbsp;{itemData.qty}&nbsp;
          <button className="minibutton-20" disabled="disabled">
            +
          </button>
          &nbsp;{itemData.name}
        </p>
      </div>
    </div>
  );
}
