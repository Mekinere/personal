<?php

namespace Drupal\static_export_data_resolver_graphql\Plugin\GraphQL\Enums\Languages;

use Drupal\Core\Language\LanguageInterface;
use Drupal\Core\Language\LanguageManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\graphql\Plugin\GraphQL\Enums\EnumPluginBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Generates an enumeration of numbers.
 *
 * @GraphQLEnum(
 *   id = "language_id_all",
 *   name = "LanguageIdAll"
 * )
 */
class LanguageIdAll extends EnumPluginBase implements ContainerFactoryPluginInterface {

  /**
   * The language manager.
   *
   * @var \Drupal\Core\Language\LanguageManagerInterface
   */
  protected $languageManager;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $pluginId, $pluginDefinition) {
    return new static(
      $configuration,
      $pluginId,
      $pluginDefinition,
      $container->get('language_manager')
    );
  }

  /**
   * LanguageIdAll constructor.
   *
   * @param array $configuration
   *   The plugin configuration array.
   * @param string $pluginId
   *   The plugin id.
   * @param array $pluginDefinition
   *   The plugin definition array.
   * @param \Drupal\Core\Language\LanguageManagerInterface $languageManager
   *   The language manager service.
   */
  public function __construct(array $configuration, $pluginId, $pluginDefinition, LanguageManagerInterface $languageManager) {
    parent::__construct($configuration, $pluginId, $pluginDefinition);
    $this->languageManager = $languageManager;
  }

  /**
   * {@inheritdoc}
   */
  public function buildEnumValues($definition) {
    $values = parent::buildEnumValues($definition);

    foreach ($this->languageManager->getLanguages(LanguageInterface::STATE_ALL) as $language) {
      $name = str_replace('-', '_', $language->getId());
      $values[strtoupper($name)] = [
        'value' => $language->getId(),
        'description' => $language->getName(),
      ];
    }

    return $values;
  }

}
