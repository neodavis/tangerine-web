import { ChangeDetectionStrategy, Component } from '@angular/core';

interface FrequentlyAskedAccordionItem {
  id: string;
  headerText: string;
  bodyText: string;
}

@Component({
  selector: 'app-frequently-asked',
  templateUrl: './frequently-asked-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrequentlyAskedPageComponent {
  items: FrequentlyAskedAccordionItem[] = [
    {
      "id": "heading-one",
      "headerText": "What is the main purpose of recipe management in culinary software?",
      "bodyText": "Recipe management in culinary software allows culinary masters to efficiently organize and store their culinary creations. It simplifies the process of accessing, editing, and sharing recipes, making it a valuable tool for chefs and cooks."
    },
    {
      "id": "heading-two",
      "headerText": "How can culinary software enhance menu planning?",
      "bodyText": "Culinary software offers intuitive menu planning tools that help culinary masters design diverse and appealing menus. It enables chefs to create balanced and harmonious menus that reflect their culinary expertise, from appetizers to desserts."
    },
    {
      "id": "heading-three",
      "headerText": "Are there any benefits to using culinary software for professional chefs?",
      "bodyText": "Yes, culinary software offers several benefits for professional chefs. It streamlines recipe management, simplifies ingredient scaling, and facilitates collaboration with kitchen staff. Additionally, it enables chefs to maintain consistency and quality in their dishes."
    },
    {
      "id": "heading-four",
      "headerText": "Can culinary software assist in nutritional analysis and dietary restrictions?",
      "bodyText": "Absolutely. Many culinary software solutions include features for nutritional analysis. Culinary masters can calculate the nutritional content of their recipes, making it easier to meet dietary requirements and provide transparent information to diners."
    },
    {
      "id": "heading-five",
      "headerText": "How do culinary workshops contribute to skill development?",
      "bodyText": "Culinary workshops hosted by the platform provide culinary masters with hands-on learning experiences. Expert instructors share insights into various cuisines and techniques, helping chefs refine their skills and explore new culinary horizons."
    },
    {
      "id": "heading-six",
      "headerText": "Is there a community or forum for culinary professionals to exchange ideas and recipes?",
      "bodyText": "Yes, many culinary software platforms offer online communities or forums where culinary masters can connect, share ideas, and exchange recipes. It's a great way to network with peers and stay updated on industry trends."
    },
    {
      "id": "heading-seven",
      "headerText": "Can I customize the culinary software to match my restaurant's branding and style?",
      "bodyText": "Most culinary software solutions offer customization options. You can typically personalize menus, recipe templates, and even the platform's appearance to align with your restaurant's branding and style."
    },
    {
      "id": "heading-eight",
      "headerText": "Is there a trial period available to test the culinary software before committing?",
      "bodyText": "Many culinary software providers offer free trial periods for their platforms. This allows culinary masters to explore the software's features and functionality before making a commitment."
    },
    {
      "id": "heading-nine",
      "headerText": "How can I get started with culinary software for recipe and menu management?",
      "bodyText": "To get started, visit our platform's website and sign up for an account. Once registered, you can begin organizing recipes, planning menus, and exploring culinary workshops to enhance your culinary expertise."
    },
    {
      "id": "heading-ten",
      "headerText": "What makes our culinary platform unique for culinary masters?",
      "bodyText": "Our culinary platform stands out with its user-friendly interface, robust recipe and menu management tools, and a supportive culinary community. We are dedicated to helping culinary masters excel in their craft and elevate their culinary creations."
    },
    {
      "id": "heading-eleven",
      "headerText": "Can I customize the culinary software to match my restaurant's branding and style?",
      "bodyText": "Most culinary software solutions offer customization options. You can typically personalize menus, recipe templates, and even the platform's appearance to align with your restaurant's branding and style."
    },
    {
      "id": "heading-twelve",
      "headerText": "Is there a trial period available to test the culinary software before committing?",
      "bodyText": "Many culinary software providers offer free trial periods for their platforms. This allows culinary masters to explore the software's features and functionality before making a commitment."
    },
  ];
}
