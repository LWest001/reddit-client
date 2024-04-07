import providers from "../assets/providers.json";

export default function getRichVideoProviders(oembed) {
  return providers.find(
    (provider) => provider.provider_name === oembed.provider_name
  );
}
