import { FunctionComponent } from "react";
import { Section } from "../../components/layout/section";
import { Heading } from "../../components/ui/heading";

export const Blog: FunctionComponent = () => {
    return (
        <Section>
            <Heading level={2} align="center">Latest Posts</Heading>
        </Section>
    )
}