
import React from "react";

const WarrantyPage = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif">Our Warranty</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl">
            We stand behind the quality of our tiles with a comprehensive warranty program.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="prose max-w-none">
          <h2>ToscanaTiles Limited Warranty</h2>
          <p>
            ToscanaTiles warrants that our products will be free from manufacturing defects and will not crack, split, or deteriorate under normal use for the periods specified below, based on product type:
          </p>

          <h3>Porcelain Tiles</h3>
          <p>
            <strong>25-Year Residential / 15-Year Commercial Warranty</strong><br/>
            Our porcelain tiles are warranted to be free from manufacturing defects for 25 years in residential applications and 15 years in commercial applications from the date of purchase.
          </p>

          <h3>Ceramic Tiles</h3>
          <p>
            <strong>15-Year Residential / 10-Year Commercial Warranty</strong><br/>
            Our ceramic tiles are warranted to be free from manufacturing defects for 15 years in residential applications and 10 years in commercial applications from the date of purchase.
          </p>

          <h3>Natural Stone</h3>
          <p>
            <strong>10-Year Residential / 5-Year Commercial Warranty</strong><br/>
            Our natural stone products are warranted to be free from manufacturing defects for 10 years in residential applications and 5 years in commercial applications from the date of purchase.
          </p>

          <h3>Terracotta & Handcrafted Tiles</h3>
          <p>
            <strong>10-Year Residential Warranty</strong><br/>
            Our handmade terracotta and artisanal tiles are warranted to be free from manufacturing defects for 10 years in residential applications from the date of purchase.
          </p>

          <h2>What This Warranty Covers</h2>
          <p>This limited warranty covers:</p>
          <ul>
            <li>Manufacturing defects that cause the tile to crack, split, or deteriorate</li>
            <li>Significant color fading beyond normal weathering</li>
            <li>Defects in glaze that lead to premature wear under normal use conditions</li>
          </ul>

          <h2>What This Warranty Does Not Cover</h2>
          <p>This limited warranty does not cover:</p>
          <ul>
            <li>Damage due to improper installation or maintenance</li>
            <li>Damage from accidents, abuse, or misuse</li>
            <li>Normal wear and tear, including scratches or dulling</li>
            <li>Variations in color, shade, texture, or size that are inherent in natural and handmade products</li>
            <li>Damage from freeze/thaw cycles for exterior applications in climates that experience freezing temperatures (unless specifically sold as frost-resistant)</li>
            <li>Installation or labor costs for replacement tiles</li>
          </ul>

          <h2>Making a Warranty Claim</h2>
          <p>
            To make a warranty claim, please contact our customer service department at warranty@toscanatiles.com or +1 (555) 123-4567. You will need to provide:
          </p>
          <ul>
            <li>Proof of purchase</li>
            <li>Photos of the affected tiles</li>
            <li>A detailed description of the issue</li>
          </ul>

          <h2>Remedy</h2>
          <p>
            For valid warranty claims, ToscanaTiles will, at our option, either replace the defective tiles with comparable tiles or refund the purchase price of the defective tiles. This warranty does not cover installation costs or other expenses.
          </p>

          <p className="text-sm text-muted-foreground mt-8">
            <strong>Note:</strong> This warranty gives you specific legal rights, and you may also have other rights that vary from state to state. Some states do not allow limitations on how long an implied warranty lasts, so the above limitations may not apply to you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarrantyPage;
