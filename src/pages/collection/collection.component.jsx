import React, { useContext } from "react";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CollectionItem from "../../components/collection-item/collection-item.component";
import { CartContext } from "../../providers/cart/cart.provider";

import "./collection.styles.scss";
import CollectionsContext from "../../contexts/collections/collections.context";

const CollectionPage = ({ match }) => {
  const { hidden } = useContext(CartContext);
  const collections = useContext(CollectionsContext);
  const collection = collections[match.params.collectionId];
  const { title, items } = collection;
  return (
    <div>
      <div className="collection-page">
        <h2 className="title">{title}</h2>
        <div className="items">
          {items.map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <CartDropdown />
    </div>
  );
};

export default CollectionPage;
